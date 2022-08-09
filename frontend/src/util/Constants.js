export const SORTING = {
    "Most Liked": {
        type: "likes",
        direction: "DESC",
        displayName: "Most Liked",
        keyName: "Most Liked"
    },
    "Least Liked": {
        type: "likes",
        direction: "ASC",
        displayName: "Least Liked",
        keyName: "Least Liked"
    },
    "Newest": {
        type: "time_created",
        direction: "DESC",
        displayName: "Most Recent",
        keyName: "Newest"
    },
    "Oldest": {
        type: "time_created",
        direction: "ASC",
        displayName: "Oldest",
        keyName: "Oldest"
    },
    "Most Interaction": {
        type: "(likes + numComments)",
        direction: "DESC",
        displayName: "Most Interactions",
        keyName: "Most Interaction"
    },
    "Least Interaction": {
        type: "(likes + numComments)",
        direction: "ASC",
        displayName: "Least Interactions",
        keyName: "Least Interaction"
    },
    "Random": {
        type: "RAND()",
        direction: "",
        displayName: "Random",
        keyName: "Random"
    }
}