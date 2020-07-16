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
				I graduated from the Wharton School of the University of Pennsylvania on May 17, 2020 with a Ph.D. in <a href="https://statistics.wharton.upenn.edu">Statistics</a>. My advisors are <a href="http://www-stat.wharton.upenn.edu/~lbrown/">Lawrence D. Brown</a> and <a href="http://www-stat.wharton.upenn.edu/~buja/">Andreas Buja</a>. My doctoral reseach concentrates on a unified framework for post-selection inference.
			</p>
			<p class="text-justify">
				My research interests include post-selection inference, large sample thoery, robust statistics, semi-parametric statistics, non-parametric statistics, concentration inequalities, high-dimensional CLT, and dependent data.
			</p>
		</div>
	</div>
</div>

<br>

<!-- <div class="container">
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
		<div class="col-7">
			<h2> Co-authors (by number of collaborations) </h2>
			<div class="panel panel-default">
			  <div class="panel-body" id="coauthors">
			  </div>
			</div>
		</div>
	</div>
</div> -->


## Contact

- Email: [karun3kumar@gmail.com](karun3kumar@gmail.com)
- Address: Department of Statistics, Baker Hall, 4909 Frew St, Pittsburgh, PA 15213.
- [Google Scholar](https://scholar.google.com.hk/citations?user=k2uOCu0AAAAJ&hl=en&oi=ao)

<br>

## Co-authors (by number of collaborations)
<div>
	<div class="panel panel-default">
	  <div class="panel-body" id="coauthors">
	  </div>
	</div>
</div>

<script>
  function lastNameSort(a,b) {
    return a.split(" ").pop()[0] > b.split(" ").pop()[0] ? 1 : -1;
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
    parsed += '<a href="' + item.homepage + '" style="font-size:' + (1+item.count/15)*15 + 'px">' +
        item.name + '</a>';
    if(i < merged.length) {parsed += ",\t ";}
  }
  parsed += "</p>";
  $("#coauthors").html(parsed);
</script>