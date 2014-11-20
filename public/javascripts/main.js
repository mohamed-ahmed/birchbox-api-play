(function(){
var apiBaseURL = "https://api.birchbox.com/products/search?query="

$(document).ready(function(){

	$("#search-input").bind("input propertychange", function(){
		console.log("input changed");
		$(".search-result").remove();
		$(".spinner").show();
		var value = $("#search-input").val();
		$.get(apiBaseURL + value, function(data){
			$(".spinner").hide();
			console.log(data);
			for(var i in data.page_products){
				var searchResult = new SearchResult(data.page_products[i]);
				searchResult.render();
			}
		})
	});
});

function SearchResult (data){
	this.data = data;
}

SearchResult.prototype.render = function(){
	var resultElem = $("<div/>",{
		class : "search-result col-md-3"
	});

	var imageElem = $("<img/>", {
		src : this.data.image.url,
		"class" : "product-image"
	});

	var linkElem = $("<a/>",{
		href : "https://www.birchbox.com/shop/" + this.data.url_path
	});

	linkElem.append(document.createTextNode(this.data.name));

	resultElem.append(linkElem);

	resultElem.append(imageElem);

	console.log(resultElem);

	$("#result-container").append(resultElem);
};

})();