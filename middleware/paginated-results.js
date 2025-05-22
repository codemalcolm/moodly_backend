function paginatedResults(model, populateOptions = []) {
  return async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const sortQuery = req.query.sort;
    const startIndex = (page - 1) * limit;

    const results = {
      next: undefined,
      prev: undefined,
      results: [],
    };

    try {
      let sortOptions = {};
      if (sortQuery) {
        const direction = sortQuery[0];
        const field = sortQuery.slice(1);
        if (!model.schema.paths[field]) {
          return res.status(400).json({
            error: `Cannot sort by unknown field: ${field}`,
          });
        }
        sortOptions[field] = direction === "-" ? 1 : -1;
      }

      let query = model.find().sort(sortOptions);

      // Apply population options
      if (populateOptions && populateOptions.length > 0) {
        populateOptions.forEach((option) => {
          query = query.populate(option);
        });
      }

      const allResults = await query.lean().exec();

      // Image conversion
      const transformedResults = allResults.map((dayEntry) => {
        if (dayEntry.journalEntries && Array.isArray(dayEntry.journalEntries)) {
          dayEntry.journalEntries.forEach((journalEntry) => {
            if (journalEntry.images && Array.isArray(journalEntry.images)) {
              journalEntry.images.forEach((image) => {
                if (image.imageData && image.imageData.data) {
                  // Convert Buffer to base64 string and add a new 'base64Image' property
                  image.imageData = Buffer.from(image.imageData.data).toString(
                    "base64"
                  );

                }
              });
            }
          });
        }
        return dayEntry;
      });

      // Filter the results (after transformation)
      const filteredResults = transformedResults.filter(
        (dayEntry) =>
          dayEntry.journalEntries && dayEntry.journalEntries.length > 0
      );

      const totalCount = filteredResults.length;
      const endIndex = startIndex + limit;

      if (endIndex < totalCount) {
        results.next = { page: page + 1, limit: limit };
      }
      if (startIndex > 0) {
        results.prev = { page: page - 1, limit: limit };
      }
      results.results = filteredResults.slice(startIndex, endIndex);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }

    res.paginatedResults = results;
    next();
  };
}

module.exports = paginatedResults;
