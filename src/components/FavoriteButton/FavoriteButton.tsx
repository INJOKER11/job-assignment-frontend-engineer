import { useMutation, useQueryClient } from "@tanstack/react-query";
import { articlesApi } from "../../shared/api/articlesApi";
import Button from "../Button/Button";


interface FavoriteButtonProps {
  slug: string;
  favorited: boolean;
  favoritesCount: number;
}


export default function FavoriteButton({ slug, favorited, favoritesCount }: FavoriteButtonProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => (favorited ? articlesApi.removeFromFavorite(slug) : articlesApi.addToFavorite(slug)),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articles"] });
      queryClient.invalidateQueries({ queryKey: ["article", slug] });
    },
  });

  return (
    <Button
      skin={favorited ? "primary" : "secondary"}
      size="sm"
      disabled={mutation.isPending}
      onClick={() => mutation.mutate()}
    >
      <i className="ion-heart" /> {favoritesCount}
    </Button>
  );
}
