"use strict";

const Recreation = use("App/Models/Recreation");

class RecreationController {
  async index() {
    const recreation = await Recreation.query()
      .with("user")
      .fetch();

    return recreation;
  }

  /**
   * Create/save a new recreation.
   * POST recreations
   */
  async store({ request, auth }) {
    const data = request.only([
      "title",
      "address",
      "description",
      "price",
      "latitude",
      "longitude",
      "files_id"
    ]);

    const recreation = await Recreation.create({
      ...data,
      user_id: auth.user.id
    });

    return recreation;
  }

  async show({ params }) {
    const recreation = await Recreation.findOrFail(params.id);

    return recreation;
  }

  /**
   * Update recreation details.
   * PUT or PATCH recreations/:id
   *
   */
  async update({ params, request }) {
    const recreation = await Recreation.findOrFail(params.id);

    const data = request.only([
      "title",
      "address",
      "description",
      "price",
      "latitude",
      "longitude",
      "files_id"
    ]);

    recreation.merge(data);

    return recreation;
  }

  /**
   * Delete a recreation with id.
   * DELETE recreations/:id
   *
   */
  async destroy({ params }) {
    const recreation = await Recreation.findOrFail(params.id);

    return recreation.delete();
  }
}

module.exports = RecreationController;
