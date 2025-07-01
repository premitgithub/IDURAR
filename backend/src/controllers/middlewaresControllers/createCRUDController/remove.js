const remove = async (Model, req, res) => {
  // Find the document by id and delete it
  // let updates = {
  //   removed: true,
  // };
  // Find the document by id and delete it
  
  // const result = await Model.findOneAndUpdate(
  //   {
  //     _id: req.params.id,
  //   },
  //   { $set: updates },
  //   {
  //     new: true, // return the new result instead of the old one
  //   }
  // ).exec();
  // If no results found, return document not found

  /* ------------------------------------------------------------- */
  // previously the items were not deleted from the databse , it was performing soft delete that 
  // is hiding the deleted data from the table but not directly deleting it , but now direct deletion is performed
  try {
  const deletedItem = await Model.findByIdAndDelete(req.params.id);
  if (!deletedItem) {
    return res.status(404).json({
      success: false,
      result: null,
      message: 'No document found ',
    });
  } else {
    return res.status(200).json({
      success: true,
      result: deletedItem,
      message: 'Successfully Deleted the document ',
    });
  }
} catch (error) {
  return res.error(500).json({
    success: false,
    result: null,
    message: error.message,
  });
}
};

  /* ------------------------------------------------------------- */


module.exports = remove;
