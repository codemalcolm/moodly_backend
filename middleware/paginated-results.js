function paginatedResults(model, populateOptions = []) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const sortQuery = req.query.sort;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < (await model.countDocuments().exec())) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.prev = {
        page: page - 1,
        limit: limit,
      };
    }

    let sortOptions = {};
    if (sortQuery) {
      const direction = sortQuery[0]; // '+' or '-'
      const field = sortQuery.slice(1); // field name of document

      // Validate field exists in schema
      if (!model.schema.paths[field]) {
        return res.status(400).json({
          error: `Cannot sort by unknown field: ${field}`,
        });
      }

      sortOptions[field] = direction === "-" ? -1 : 1;
    }

    try {
      let query = model.find();

      if (Object.keys(sortOptions).length > 0) {
        query = query.sort(sortOptions);
      }

      // Applying population if popilateOptions are provided
      if (populateOptions && populateOptions.length > 0) {
        populateOptions.forEach((option) => {
          query = query.populate(option);
        });
      }

      results.results = await query.limit(limit).skip(startIndex).exec();
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    res.paginatedResults = results;
    next();
  };
}

module.exports = paginatedResults;
