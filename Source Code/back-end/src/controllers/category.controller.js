const validator = require("validator");
const categoryService = require("../services/category.service");
const errorCode = require("../errors/errorCode");
const CustomError = require("../errors/CustomError");

function checkAuth(currentUser) {
    const permittedRole = ["admin", "mod"];
    permittedRole.forEach(role => {
        if (role === currentUser.role)
            return true;
    });
    return false;
}

async function createCategory(req, res) {
    const isValidRole = await checkAuth(req.user);
    if (!isValidRole) {
        throw new CustomError(errorCode.UNAUTHORIZED, "Not permited to do this action!");
    }

    const categoryInfo = req.body;
    const category = await categoryService.createCategory(categoryInfo);
    res.status(201).send({
        status: 1,
        results: category
    })
};

async function updateCategory(req, res) {
    const isValidRole = await checkAuth(req.user);
    if (!isValidRole) {
        throw new CustomError(errorCode.UNAUTHORIZED, "Not permited to do this action!");
    }
    
    const { name } = req.params;
    const updatedInfo = req.body;
    const category = await categoryService.updateCategory(name, updatedInfo);
    res.send(category);
}

async function deleteCategory(req, res) {
    const isValidRole = await checkAuth(req.user);
    if (!isValidRole) {
        throw new CustomError(errorCode.UNAUTHORIZED, "Not permited to do this action!");
    }

    const { name } = req.params;

    const category = await categoryService.deleteCategory(name);

    res.send({
        status: 1,
        results: category,
    });
}

module.exports = {
    createCategory,
    updateCategory,
    deleteCategory
}