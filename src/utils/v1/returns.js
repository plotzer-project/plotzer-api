export const userSuccessReturn = (user) => {
    const userId = user._id.toString()
    const data = {
        type: "user",
        id: userId,
        attributes: {
            "name": user.user,
            "email": user.email
        },
        links: {
            self: "/api/v1/users/" + userId
        }
    }
    return data
}