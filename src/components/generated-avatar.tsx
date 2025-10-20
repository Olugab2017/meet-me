import {createAvatar} from '@dicebear/core';
import {botttsNeutral, initials} from '@dicebear/collection';

import {cn} from '@/lib/utils';
import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';

interface GeneratedAvatarProps {
    seed: string;
    size?: number;
    variant?: 'botttsNeutral' | 'initials';
    className?: string;
}

export const GeneratedAvatar = ({
    seed,
    size = 40,
    variant = 'botttsNeutral',
    className,
}: GeneratedAvatarProps) => {
    let avatar;
    if (variant === 'botttsNeutral') {
        avatar = createAvatar(botttsNeutral, {
            seed,
           
        });
    } else {
        avatar = createAvatar(initials, {
            seed,
            fontSize: 42,
            fontWeight: 400,
        });
    }

    return (
        <Avatar className={cn('h-10 w-10', className)}>
            <AvatarImage src={avatar.toDataUri()} alt={`Avatar for ${seed}`} />
            <AvatarFallback>{seed.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
    );
};
