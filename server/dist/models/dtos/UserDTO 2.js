"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserDTO {
    constructor(user) {
        this.userId = user.userId;
        this.firstName = user.firstName;
        this.lastName = user.lastName;
        this.email = user.email;
        this.isActive = user.isActive;
        this.creationDate = user.creationDate;
    }
}
exports.UserDTO = UserDTO;
//# sourceMappingURL=UserDTO.js.map