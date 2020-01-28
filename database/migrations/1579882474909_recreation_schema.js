"use strict";

const Schema = use("Schema");

class RecreationSchema extends Schema {
  up() {
    this.create("recreations", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      table
        .integer("files_id")
        .unsigned()
        .references("id")
        .inTable("files")
        .onUpdate("CASCADE")
        .onDelete("SET NULL");
      table.string("title").notNullable();
      table.text("description").notNullable();
      table.string("address").notNullable();
      table.decimal("price").notNullable();
      table.decimal("latitude", 9, 6).notNullable();
      table.decimal("longitude", 9, 6).notNullable();
      table.timestamps();
    });
  }

  down() {
    this.drop("recreations");
  }
}

module.exports = RecreationSchema;
