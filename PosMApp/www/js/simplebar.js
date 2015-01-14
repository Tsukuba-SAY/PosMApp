
   var fontsize = 14;  

   var margin = {top: 20, right: 20, bottom: 80, left: 40},
      width = window.innerWidth*0.8 - margin.left - margin.right,
      height = window.innerHeight*0.7 - margin.top - margin.bottom;

   var x = d3.scale.ordinal()
      .rangeRoundBands([0, width], .1);

   var y = d3.scale.linear()
      .range([height, 0]);

   var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

   var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

   var svg = d3.select("#barchart").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

   d3.json("../php/data.php", function(error, data) {  
      x.domain(data.map(function(d) { return d.sessionid; }));
      y.domain([0, d3.max(data, function(d) { return parseInt(d.frequency); })]);
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)
      .selectAll("text")
         .style("text-anchor","end")
         .style("font-size","14")
         .attr("dx", "-0.8em")
         .attr("dy", "-0.6em")
         .attr("transform", "rotate(-90)");

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency");
      
    svg.selectAll(".bar")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) { return x(d.sessionid); })
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.frequency); })
      .attr("height", function(d) { return height - y(d.frequency); });
      
      fontsize=x.rangeBand()*0.8;
      if(x.rangeBand()>28){ fontsize=28;}
      
      
    svg.selectAll(".label")
       .append("labels")
       .data(data)
       .enter().append("text")
       .attr("class","label")
       .attr("x",function(d){ return x(d.sessionid); })
       .attr("y",function(d) {return y(d.frequency); })
       .attr("dx",x.rangeBand()/2)
       .attr("dy", "0.6em")
       .attr("font-size",fontsize)
       .text(function(d){ if(height - y(d.frequency)==0)return ""; else return d.title.substr(0,substrLength(d.title,d.frequency,fontsize));})
       .attr("fill","white")
   });
   
   setTimeout("location.reload()",1000*5*60);

   function substrLength(str,freq,fontsize) { 
    var r = 0; 
    var maxlength = Math.floor((height - y(freq))/(fontsize+2));

    for (var i = 0; i < str.length; i++) { 
        var c = str.charCodeAt(i); 
        // Unicode : 0x0 ` 0x80, 0xf8f0, 0xff61 ` 0xff9f, 0xf8f1 ` 0xf8f3 
        if ( (c >= 0x0 && c < 0x81) || (c == 0xf8f0) || (c >= 0xff61 && c < 0xffa0) || (c >= 0xf8f1 && c < 0xf8f4)) { 
            r += 1; 
        } else { 
            r += 2; 
        }
        if(r>maxlength){
            return r;
        }
    } 
    return r; 
   } 

   function type(d) {
     d.frequency = +d.frequency;
     return d;
   }
   
