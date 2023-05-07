const UserDto = (User) => {
    return { id: User._id, name: User.name, email: User.email };
};

module.exports = UserDto;