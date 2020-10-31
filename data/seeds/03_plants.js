
exports.seed = async function(knex) {
	await knex("plants").insert([
		{id: 1, nickname: "myPlant_2", species: "ficus", frequency_value: 1, frequency_range: "weeks", image_binary: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", user_id: 1 },
        {id: 2, nickname: "myPlant_3", species: "ficus", frequency_value: 1, frequency_range: "weeks", image_binary: "https://images.unsplash.com/photo-1525498128493-380d1990a112?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",  user_id: 2 },
        {id: 3, nickname: "myPlant_4", species: "ficus", frequency_value: 1, frequency_range: "weeks", image_binary: "https://images.unsplash.com/photo-1521334884684-d80222895322?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", user_id: 3 },
        {id: 4, nickname: "myPlant_5", species: "ficus", frequency_value: 1, image_binary: "https://images.unsplash.com/photo-1459156212016-c812468e2115?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",  frequency_range: "weeks", image_binary: "https://images.unsplash.com/photo-1491147334573-44cbb4602074?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",  user_id: 4 },
        {id: 5, nickname: "myPlant_6", species: "ficus", frequency_value: 1, frequency_range: "weeks", image_binary: "https://images.unsplash.com/photo-1495908333425-29a1e0918c5f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60", user_id: 5 }
	])
}
