"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { meetingInsertSchema } from "@/modules/agents/schemas";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface MeetingFormProps {
    onSuccess?: () => void;
    onCancel?: () => void;
    initialValues?: any;
}

export const MeetingForm = ({ onSuccess, onCancel, initialValues }: MeetingFormProps) => {
    const trpc = useTRPC();
    const queryClient = useQueryClient();

    // Fetch agents using React Query with tRPC options
    const { data: agentsData, isLoading: isLoadingAgents } = useQuery(
        trpc.agents.getMany.queryOptions({})
    );

    // Extract the items array from the response
    const agents = agentsData?.items ?? [];

    // Create meeting mutation
    const createMeeting = useMutation({
        ...trpc.meetings.create.mutationOptions(),
        onSuccess: () => {
            queryClient.invalidateQueries();
            onSuccess?.();
        },
        onError: (error: any) => {
            console.error("Failed to create meeting:", error);
        }
    });

    const form = useForm<z.infer<typeof meetingInsertSchema>>({
        resolver: zodResolver(meetingInsertSchema),
        defaultValues: {
            agentId: initialValues?.agentId ?? "",
            title: initialValues?.title ?? "",
            description: initialValues?.description ?? "",
            scheduledAt: initialValues?.scheduledAt ? new Date(initialValues.scheduledAt) : undefined,
            status: initialValues?.status ?? "scheduled",
        }
    });

    const isEdit = !!initialValues?.id;
    const isPending = createMeeting.isPending;

    const onSubmit = async (values: z.infer<typeof meetingInsertSchema>) => {
        try {
            // Transform the data before sending
            const submitData = {
                agentId: values.agentId,
                title: values.title,
                description: values.description,
                // Convert scheduledAt string to Date if it exists
                scheduledAt: values.scheduledAt ? new Date(values.scheduledAt) : undefined,
            };

            if (isEdit) {
                console.log("Update not implemented yet");
            } else {
                await createMeeting.mutateAsync(submitData);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField 
                    name="agentId"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Select Agent</FormLabel>
                            <Select 
                                onValueChange={field.onChange} 
                                defaultValue={field.value}
                                disabled={isLoadingAgents}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder={isLoadingAgents ? "Loading agents..." : "Choose an agent"} />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {agents.map((agent) => (
                                        <SelectItem key={agent.id} value={agent.id}>
                                            {agent.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <FormField 
                    name="title"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Meeting Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Enter meeting title" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <FormField 
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea 
                                    placeholder="Enter meeting description" 
                                    {...field} 
                                    rows={4}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <FormField 
                    name="scheduledAt"
                    control={form.control}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Schedule Date & Time (Optional)</FormLabel>
                            <FormControl>
                                <Input 
                                    type="datetime-local" 
                                    value={field.value ? (typeof field.value === 'string' ? field.value : new Date(field.value).toISOString().slice(0, 16)) : ""}
                                    onChange={(e) => {
                                        // Store as string in form, will convert to Date on submit
                                        field.onChange(e.target.value || undefined);
                                    }}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end gap-2">
                    {onCancel && (
                        <Button 
                            type="button" 
                            variant="ghost" 
                            onClick={onCancel}
                            disabled={isPending}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button type="submit" disabled={isPending || isLoadingAgents}>
                        {isPending ? "Saving..." : isEdit ? "Update Meeting" : "Create Meeting"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};