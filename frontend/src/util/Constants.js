export const SORTING = {
    "Most Liked": {
        type: "likes",
        direction: "DESC",
        displayName: "Most Liked"
    },
    "Least Liked": {
        type: "likes",
        direction: "ASC",
        displayName: "Least Liked"
    },
    "Newest": {
        type: "time_created",
        direction: "DESC",
        displayName: "Most Recent"
    },
    "Oldest": {
        type: "time_created",
        direction: "ASC",
        displayName: "Oldest"
    },
    "Most Interaction": {
        type: "(likes + numComments)",
        direction: "DESC",
        displayName: "Most Interactions"
    },
    "Least Interaction": {
        type: "(likes + numComments)",
        direction: "ASC",
        displayName: "Least Interactions"
    },
    "Random": {
        displayName: "Random"
    }
}