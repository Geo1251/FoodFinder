import UserService from './userService.js';

class UserController {
    async register(req, res) {
        try {
            const user = await UserService.register(req.body);
            res.status(200).json(user);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: e.message });
        }
    }

    async login(req, res) {
        try {
            const { user, token } = await UserService.login(req.body);
            res.status(200).json({ user, token });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: e.message });
        }
    }

    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.status(200).json(users);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: e.message });
        }
    }

    async verifyToken(req, res) {
        try {
            const token = req.headers['authorization'].split(' ')[1];
            const user = await UserService.verifyToken(token);
            res.status(200).json({ user });
        } catch (e) {
            console.error(e);
            res.status(401).json({ message: e.message });
        }
    }

    async updateUser(req, res) {
        try {
            const userId = req.params.id;
            const user = await UserService.updateUser(userId, req.body);
            res.status(200).json(user);
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: e.message });
        }
    }

    async updateAvatar(req, res) {
        try {
            const userId = req.params.id;
            const avatar = req.files.avatar;
            const user = await UserService.updateAvatar(userId, avatar);
            res.status(200).json({ avatar: user.avatar });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: e.message });
        }
    }
}

export default new UserController();