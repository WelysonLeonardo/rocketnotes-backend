const UserCreateService = require('./UserCreateService');
const UserRepositoryInMemoty = require('../repositories/UserRepositoryInMemory');
const AppError = require('../utils/AppError');

describe("UserCreateService", () => {
    let userRepositoryInMemory = null;
    let userCreateService = null;

    beforeEach(() => {
        userRepositoryInMemory = new UserRepositoryInMemoty();
        userCreateService = new UserCreateService(userRepositoryInMemory);
    });

    
    it("user should be create", async () => {
        const user = {
            name: "User Teste",
            email: "user@teste.com",
            password: "123"
        };


        const userCreated = await userCreateService.execute(user);

        expect(userCreated).toHaveProperty("id");
    });

    it("user not should be create with exists email", async () => {
        const user1 = {
            name: "User Teste 1",
            email: "user@teste.com",
            password: "123"
        };

        const user2 = {
            name: "User Teste 2",
            email: "user@teste.com",
            password: "456"
        };

        await userCreateService.execute(user1);
        await expect(userCreateService.execute(user2)).rejects.toEqual(new AppError(`Este e-mail já está cadastrado`));

    });
});

module.exports = UserRepositoryInMemoty;