exports.up = async function(knex) {

    await knex.schema.createTable("users", (table) => {
		table.increments("id")
		table.text("username", 128).notNull().unique()
        table.text("password", 128).notNull()
        table.text("phoneNumber").notNull()
       
    })

    await knex.schema.createTable("plants", (table) => {
		table.increments("id")
        table.text("nickname", 64).notNull()
        table.text("species", 64).notNull()
        table.integer("frequency_value").notNull()
        table.text("frequency_range").notNull()
        table.text("image_binary")
        table
        .integer("user_id")
        .notNull()
        .references("id")
        .inTable("users")
        .onDelete("SET NULL")
        .onUpdate("CASCADE")
    })
    
   
}

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("plants")
    await knex.schema.dropTableIfExists("users")

}

