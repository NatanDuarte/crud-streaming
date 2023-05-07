const UserDto = (User) => {
    return {
        id: User._id,
        name: User.name,
        email: User.email,
        profileImage: User.profileImage
    };
};

module.exports = UserDto;