import Button from "../Button/Button";
import { profileApi } from "../../shared/api/profileApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Profile } from "../../shared/types/profile";

interface FollowButtonProps {
  profile: Profile;
}

export default function FollowButton({ profile }: FollowButtonProps) {
  const queryClient = useQueryClient();

  const followMutation = useMutation({
    mutationFn: () =>
      profile.following ? profileApi.unfollowProfile(profile.username) : profileApi.followProfile(profile.username),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["profile", profile.username],
      });

      queryClient.invalidateQueries({
        queryKey: ["articles"],
      });

      queryClient.invalidateQueries({
        queryKey: ["article"],
      });
    },
  });

  return (
    <Button skin="secondary" size="sm" disabled={followMutation.isPending} onClick={() => followMutation.mutate()}>
      <i className="ion-plus-round" /> {profile.following ? "Unfollow" : "Follow"} {profile.username}
    </Button>
  );
}
