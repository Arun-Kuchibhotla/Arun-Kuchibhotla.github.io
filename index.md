---
layout: default
title: Home
nav_order: 1
description: "Homepage"
permalink: /
---

<div class="container">
	<div class="row">
		<div class="col-4">
			<img src="{{'/assets/images/dolomites_sm.jpeg'| prepend:site.baseurl}}">
		</div>
		<div class="col">
			<p class="text-justify">
				Welcome to my homepage! 
			</p>
			<p class="text-justify">
				I am a fifth-year doctoral candidate in the <a href="https://statistics.wharton.upenn.edu">Statistics</a> <a href="https://statistics.wharton.upenn.edu">Department</a> at the Wharton School of the University of Pennsylvania. My advisors are <a href="http://www-stat.wharton.upenn.edu/~lbrown/">Lawrence D. Brown</a> and <a href="http://www-stat.wharton.upenn.edu/~buja/">Andreas Buja</a>. My doctoral reseach concentrates on a unified framework for post-selection inference.
			</p>
		</div>
	</div>
</div>

<br>

<div class="container">
	<div class="row">
		<div class="col">
			<h2> Research Interests </h2>
			<ul>
				<li> Post-selection inference </li>
				<li> Large sample theory </li>
				<li> Robust statistics </li>
				<li> Semi-parametric statistics </li>
				<li> Non-parametric statistics </li>
				<li> Concentration inequalities </li>
				<li> High-dimensional CLT </li>
				<li> Dependent data </li>
			</ul>
		</div>
		<div class="col-6">
			<h2> Collaborators </h2>
			<div class="panel panel-default">
			  <div class="panel-body" id="coauthors">
			  </div>
			</div>
		</div>
	</div>
</div>


## Contact

- Email: arunku *at* wharton *dot* upenn *dot* edu
- Address: 450 Jon M. Huntsman Hall, 3730 Walnut Street, Philadelphia, 19104
- [Google Scholar](https://scholar.google.com.hk/citations?user=k2uOCu0AAAAJ&hl=en&oi=ao)



<script>
  function lastNameSort(a,b) {
    return a.split(" ").pop()[0] > b.split(" ").pop()[0]
  };

  var pubs = {{ site.data.publications | jsonify }}, 
      coauthors = {{ site.data.coauthors | jsonify }};
  var authors = [];
  for (var pub, i = 0; pub = pubs[i++];) {
    var author_arr = pub.authors;
    for (var author, j = 0; author = author_arr[j++];) {
      if (author.name != "Arun Kumar Kuchibhotla") {
        authors.push(author.name);
      }
    }
  }
  sorted_authors = authors.sort(lastNameSort);
  var author_obj = {};
  for(var author, i = 0; author = sorted_authors[i++];) {
  	if(author in author_obj) {
  		author_obj[author]++;
  	} else {
  		author_obj[author] = 1;
  	}
  }
  var author_arr = Object
    .keys(author_obj)
    .map(k => ({ "name": k, "count": author_obj[k] }));
  var merged = author_arr
    .map(x => Object.assign(x, coauthors.find(y => y.name == x.name )));

  var parsed = "<p class='text-justify'>";
  for(var item, i = 0; item = merged[i++];) {
    parsed += '<a href="' + item.homepage + '" style="font-size:' + (1+item.count/10)*15 + 'px">' +
        item.name + '</a>';
    if(i < merged.length) {parsed += ",\t ";}
  }
  parsed += "</p>";
  $("#coauthors").html(parsed);
</script>