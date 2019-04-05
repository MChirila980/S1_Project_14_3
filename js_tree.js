"use strict";

/*
   New Perspectives on HTML5, CSS3, and JavaScript 6th Edition
   Tutorial 12
   Case Problem 3

   Author: Melinda Chirila
   Date:   4/5/2019

   Filename: js_tree.js

   Global Variables:
   nodeCount
      Running count of all nodes in the source document
   elementCount
      Running count of all element nodes in the source document
   textCount
      Running count of all text nodes in the source document
   wsCount
      Running count of all white space text nodes in the source document


   Functions List:
   makeTree() 
      Sets up and places the node tree within the HTML document and
      displays the node counts from the document

   makeBranches(treeNode, nestedList)
      Makes a list item or an ordered list based on the contents and type
      of node from the sourceNode parameter and then appends that list
      item or ordered list to nestedList. The function recursively calls 
      itself to navigate throught the node tree of the source document.

   isWhiteSpaceNode(tString)
      Returns true if tString represents the text of a white space text
      node and false if it doesn't
*/

//this is creating the global variables
var nodeCount = 0;
var elementCount = 0;
var textCount = 0;
var wsCount = 0;

window.addEventListener("load", makeTree);
//making the tree
function makeTree() {

      var asideFrag = document.createElement("aside");
      asideFrag.setAttribute("id", "treeBox");
      asideFrag.innerHTML = "<h1>Node Tree</h1>";

      document.getElementById("main").appendChild(asideFrag);

      var nodeList = document.createElement("ol");

      asideFrag.appendChild(nodeList);

      var sourceArticle = document.querySelectorAll("#main article");

      makeBranches(sourceArticle, nodeList);

      document.getElementById("totalNodes").innerText = nodeCount;

      document.getElementById("elemNodes").innerText = elementCount;

      document.getElementById("textNodes").innerText = textCount;

      document.getElementById("wsNodes").innerText = wsCount;
}

function makeBranches(treeNode, nestedList) {

      // this will basically increase the nodeCount variable by a 1 
      nodeCount++;

      var liElem = document.createElement("li");
      liElem.textContent = "+--";

      var spanElem = document.createElement("span");

      liElem.appendChild(spanElem);

      nestedList.appendChild(liElem);

      if (treeNode.nodeType === Node.ELEMENT_NODE) {

            elementCount++

            spanElem.setAttribute("class", "elementNode");

            spanElem.textContent = "<" + treeNode + ">";

      } else {
            //this is the text count of the tree node
            textCount++
            var textString = treeNode;

            if (isWhiteSpaceNode(textString) === true) {
                  wsCount++
                  spanElem.setAttribute("class", "whiteSpaceNode");
                  spanElem.innerText += "#text";
            }
            //false white space
            if (isWhiteSpaceNode(textString) === false) {
                  spanElem.setAttribute("class", "textNode");
                  console.log(textString);
                  spanElem.innerText += textString.value;
            }
            //new list
            if (treeNode.childNodes.value > 0) {
                  var newList = document.createElement("ol");
                  newList.innerText = "|";
                  nestedList.appendChild(newList);

                  for (var n = 0; n < treeNode.childNodes.length; n++) {
                        makeBranches(n, newList);
                  }
            }
      }
}

            function isWhiteSpaceNode(tString) {
      return !(/[^\t\n\r ]/.test(tString));
}