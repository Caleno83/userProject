const hashedPassword = "$2a$14$qHqCbXUImiBOgXlFNX47wuA7uFWNGNAZutYLvOeye9eotewGlfYV6"

exports.seed = async function(knex) {
	await knex("users").insert([
    {id: 1, username: "janedoe_6", password: hashedPassword, phoneNumber: "111-111-1112"},
    {id: 2, username: "janedoe_5", password: hashedPassword, phoneNumber: "111-111-1112"},
    {id: 3, username: "janedoe_1", password: hashedPassword, phoneNumber: "111-111-1112"},
    {id: 4, username: "janedoe_4", password: hashedPassword, phoneNumber: "111-111-1112"},
    {id: 5, username: "janedoe_3", password: hashedPassword, phoneNumber: "111-111-1112"},
    {id: 6, username: "janedoe_2", password: hashedPassword, phoneNumber: "111-111-1112"}
  ])
}
