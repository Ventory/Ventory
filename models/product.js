var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var orderSchema = require('./order');

var productSchema = new Schema({
	title: { type: String, index: true},
	description: { type: String },
	keywords: [String],
	orders: [orderSchema],
});

function extractKeywords(text1, text2) {
  if (!text) return [];
  return text.
    split(/\s+/).
    filter(function(v) { return v.length > 2; }).
    filter(function(v, i, a) { return a.lastIndexOf(v) === i; });
}

productSchema.pre("save", function(next){
	this.keywords = extractKeywords(this.title, this.description);
	next();
});
mongoose.model("product", productSchema);