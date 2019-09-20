---
layout: default
title: Research
nav_order: 2
---

## Publications
{: .no_toc }

<!-- {% assign sorted_publications = site.data.publications | where:"type",type | sort: 'year' %}
{% for paper in sorted_publications %}
{% assign paper = paper_hash[1] %}
<ul class="list-group list-group-flush">
  <li class="list-group-item">
    <p> {{ paper.title }} </p>
    <a href="{{ paper.citation_url }}">
    </a>
    {% for author in paper.authors %}
    	{{ author.name }},
    {% endfor %}
  </li>
</ul>
{% endfor %} -->

<div class="row">
  <div class="col-sm-12 mb-3 mt-3">
    <input type="text" id="myFilter" class="form-control" onkeyup="myFunction()" placeholder="&#xF002; &nbsp; Search for title, author, journal" style="font-family:Arial, FontAwesome">
  </div>
</div>
<div class="row" id="myItems">
  <div class="col-sm-12 mb-3">
    {% assign sorted_publications = site.data.publications | where:"type",type | sort: 'year' | reverse %}
    {% for paper in sorted_publications %}
    {% assign paper = paper_hash[1] %}
    <div class="card border-light">
      <div class="card-body">
        <h5 class="card-title">{{ paper.title }}</h5>
        <h6 class="card-subtitle mb-2 text-muted pb-1"> 
          {% for author in paper.authors %}
            {% if forloop.index < paper.authors.size %} 
              {% if author.name == 'AK Kuchibhotla' %}
                <b>{{ author.name }}</b>,
              {% else %} {{ author.name }},
              {% endif %}
            {% else %} 
              {% if author.name == 'AK Kuchibhotla' %}
                <b>{{ author.name }}</b>
              {% else %} {{ author.name }}
              {% endif %}
            {% endif %}
          {% endfor %}
          ({{ paper.year }})
        </h6>
        <h6 class="card-text"> 
          {{ paper.source }} 
          [<a data-toggle="collapse" data-target="#collapseExample{{ paper.id }}" aria-expanded="false" aria-controls="collapseExample{{ paper.id }}" href="">
            Abstract
          </a>]
          [<a href="{{ paper.citation_url}}">
            arXiv
          </a>]
        </h6>
        <div class="collapse" id="collapseExample{{ paper.id }}">
          <div class="container">
            <hr/>
            {{ paper.abstract }}
          </div>
        </div>
      </div>
    </div>  
    {% endfor %}   
  </div>    
</div>


<script>
  function myFunction() {
    var input, filter, cards, cardContainer, h5, title, i;
    input = document.getElementById("myFilter");
    filter = input.value.toUpperCase();
    cardContainer = document.getElementById("myItems");
    cards = cardContainer.getElementsByClassName("card");
    for (i = 0; i < cards.length; i++) {
        title = cards[i].querySelector(".card-body h5.card-title");
        authors = cards[i].querySelector(".card-body h6.card-subtitle");
        type = cards[i].querySelector(".card-body h6.card-text");
        if (title.innerText.toUpperCase().indexOf(filter) > -1 | authors.innerText.toUpperCase().indexOf(filter) > -1 | type.innerText.toUpperCase().indexOf(filter) > -1 ) {
            cards[i].style.display = "";
        } else {
            cards[i].style.display = "none";
        }
    }
}
</script>
