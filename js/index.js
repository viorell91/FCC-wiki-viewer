//-----------------
//FUNCTIONALITY
//-----------------
$(document).ready(function(){
  //swith buttons from "random" to "search" article
  $("#queryInput").on("focus",function(e){
    document.getElementById("searchBtn").style.visibility="visible";
    document.getElementById("randomBtn").style.visibility="hidden";
  });
  //swith buttons from "search" to "random" article
  $("#queryInput").on("focusout",function(e){
    document.getElementById("randomBtn").style.visibility="visible";
    document.getElementById("searchBtn").style.visibility="hidden";
  });
  //open random article 
  $("#randomBtn").click(function(){ 
    window.open("https://en.wikipedia.org/wiki/Special:Random");
  });
  //search if Enter is pressed
   $("#queryInput").keypress(function(e){
    if(e.which == 13){
      $("#searchBtn").click();
    }
  });
  
  //GENERATE LIST OF ARTICLES
  $("#searchBtn").on("click",function(){
    var query = document.getElementById("queryInput").value;
    
    document.getElementById("queryInput").style.transform = "translate3d(0,-150px,0)";
    //document.getElementById("queryInput").style.position = "fixed";
    document.getElementById("searchBtn").style.transform = "translate3d(0,-150px,0)";
    document.getElementById("randomBtn").style.transform = "translate3d(0,-150px,0)";
    //extract meta data from each wiki article found
    $.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search="+query+"&profile=fuzzy&suggest=1&callback=?",  function(json){
      //var title = json[2];
      var titles=[];
      var intros=[];
      links=[];
      json[1].forEach(function(title){
        titles.push(title);
      });
      json[2].forEach(function(intro){
        intros.push(intro);
      });
      json[3].forEach(function(link){
        links.push(link);
      });
      
      var elem = 0;
      //case when no articles found
      document.getElementById("no_articles").style.visibility="hidden";
      if(titles.length == 0){
        document.getElementById("no_articles").style.visibility="visible";
        //$("#no_articles").html(titles.length);
      }
      
      while(document.getElementById("list").hasChildNodes()){
        document.getElementById("list").removeChild(document.getElementById("list").firstChild);
      }
      //display meta data of each article
      for(var i=0;i<titles.length;i++){
        elem = document.createElement("div");
        elem.setAttribute("id","entry"+i);
        elem.setAttribute("class","results");
        elem.setAttribute("style","text-align:center");
        var p_header = document.createElement("p");
        p_header.setAttribute("class","headers");
        
        var p_intro = document.createElement("p");
        p_intro.setAttribute("class","intros");
        var p_links = document.createElement("p");
        p_links.setAttribute("class","links");
        var textnode_p = document.createTextNode(titles[i]);
        var textnode_i = document.createTextNode(intros[i]);
        
        p_header.appendChild(textnode_p);
        p_intro.appendChild(textnode_i);
        
        elem.appendChild(p_header);
        elem.appendChild(p_intro);
        
        document.getElementById('list').appendChild(elem);
      }
      //redirect to source artcile page on click
        $("#entry0").click(function(){ 
          window.open(links[0]);
        });
        $("#entry1").click(function(){ 
          window.open(links[1]);
        });
        $("#entry2").click(function(){ 
          window.open(links[2]);
        });
        $("#entry3").click(function(){ 
          window.open(links[3]);
        });
        $("#entry4").click(function(){ 
          window.open(links[4]);
        });
        $("#entry5").click(function(){ 
          window.open(links[5]);
        });
        $("#entry6").click(function(){ 
          window.open(links[6]);
        });
        $("#entry7").click(function(){ 
          window.open(links[7]);
        });
        $("#entry8").click(function(){ 
          window.open(links[8]);
        });
        $("#entry9").click(function(){ 
          window.open(links[9]);
        });
    });
  });
});