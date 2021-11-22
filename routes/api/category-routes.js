const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
	// find all categories
	// be sure to include its associated Products
	try {
		const allCategories = await Category.findAll({
			include: [{ model: Product }],
		});
		res.status(200).json(allCategories);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.get("/:id", (req, res) => {
	// find one category by its `id` value
	// be sure to include its associated Products
	try {
		const singleCategory = await Category.findByPk(req.params.id, {
			include: [{ model: Product }],
		});
		if (!singleCategory) {
			res.status(404).json({
				message: "There is no category with that id.",
			});
			return;
		}
		res.status(200).json(singleCategory);
	} catch (err) {
		res.status(500).json(err);
	}
});

router.post("/", (req, res) => {
	// create a new category
	Category.create({
		category_name: req.body.category_name,
	})
		.then((newCategory) => {
			res.json(newCategory);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.put("/:id", (req, res) => {
	// update a category by its `id` value
	Category.update(req.body, {
		where: { id: req.params.id },
	})
		.then((updateCategory) => {
			if (!updateCategory) {
				res.status(404).json({
					message: "There is no category with that id.",
				});
				return;
			}
			res.json(updateCategory);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.delete("/:id", (req, res) => {
	// delete a category by its `id` value
	Category.destroy({
		where: { id: req.params.id },
	})
		.then((deleteCategory) => {
			if (!deleteCategory) {
				res.status(404).json({
					message: "There is no category with that id.",
				});
				return;
			}
			res.json(deleteCategory);
		})
		.catch((err) => res.status(500).json(err));
});

module.exports = router;
