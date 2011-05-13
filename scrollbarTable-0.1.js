/*
 * jQuery scrollbarTable - v0.1 - 5/13/2011
 * Derek Bredensteiner
 * Licensed under the MIT license http://www.opensource.org/licenses/mit-license.php
 */
(function($){
	$.fn.scrollbarTable = function(i){
		var o = {};
		if(typeof(i)=='number')o.height=i;
		else if(typeof(i)=='object') o = i;
		else if(typeof(i)=='undefined') o = 
			{
				height: 300
			}
		return this.each(function(){
			var $t = $(this);
			
			/* Make room for the scrollbar */
			var w = $t.width();
			$t.width(w-
			
			/* 
			 * http://benalman.com/projects/jquery-misc-plugins/scrollbarwidth 
			 * Modifications made, must have a height on the child to fix IE7 with no doctype issues.
			 */
			function(width) {
				var parent,
				  child;
				
				if ( width === undefined ) {
				  parent = $('<div style="width:50px;height:50px;overflow:auto"><div style="height:50px;"></div></div>').appendTo('body');
				  child = parent.children();
				  width = child.innerWidth() - child.height( 99 ).innerWidth();
				  parent.remove();
				}
				
				return width;
			}()
			);
			
			/* Calculate the column widths for future use */
			var cols = [];
			$t.find('tr:first th,tr:first td').each(function(){
				cols.push($(this).width());
			});
			
			/* Remove the header and put it before the rest of the table as a new table*/
			var $firstRow = $t.clone();
			$firstRow.find('tr:not(:first)').remove();
			$t.find('tr:first').remove();
			$t.before($firstRow);
			
			/* Make the header, and the scrolling table, column widths the same as the original */
			$firstRow.find('tr:first th,tr:first td').each(function(i){
				$(this).attr('width',cols[i]);
			});
			$t.find('tr:first th,tr:first td').each(function(i){
				$(this).attr('width',cols[i]);
			});
			
			/* Wrap the rest of the table in a scroller */
			var $wrap = $('<div>');
			$wrap.css({
				width:w,
				height:o.height,
				overflow: 'auto'
			});
			$t.wrap($wrap);
		})
	};
}(jQuery));