<?php

// =======================
// php minisite config file
// =======================

// Theme name
define("THEME","theme");

// Default page
define("DEFAULTPAGE","startPHP.php");

// URL style sitename
define("SHORTSITENAME","blank");

// LONG sitename
define("LONGSITENAME","blank, css et prototypes");

// Domain name
define("SITEURL","http://polylogue.com");

// Motto
define("MOTTO","You only live once that's the motto n*gga YOLO");

// Default Keywords
define("METAKEYWORDS","Blank, CSS, CSS Framework, best practices, HTML, website prototype, prototypage");

// Default Description
define("METADESCRIPTION","Blank est un framework CSS accompagné d'un système de  prototypage rapide HTML ou PHP conçu par Nicolas Taffin");

// Default Author
define("METAAUTHOR","Nicolas Taffin | http://polylogue.com");

// Default Image
define("METAIMAGE","");

// Default content
define("DEFAULTCONTENT","blank");

// Helpers path
define("HELPERSFILEBASE","helpers/");


// =======================
// Basic content management
// =======================


// Minisite content table to manage urlname, label (for navigation) and titles for content

$TABRUBRIQUES = array(	
	array(DEFAULTCONTENT,"home","the default"),
	array("test1","nav 1","le titre de la page 1"),
	array("test2","nav 2","le titre de la page 2"),
	array("test3","nav 3","le titre de la page 3"),
	);

// Request management

$contenu="";

// Does content request exist ?

if (isset($_REQUEST['contenu'])) {
		$contenu = $_REQUEST['contenu']; 
	} else {$contenu = DEFAULTCONTENT; }

// Security : allows content request only within the content table
	
function array_searchRecursive( $needle, $haystack, $strict=false, $path=array() )
{
  if( !is_array($haystack) ) {
      return false;
  }

  foreach( $haystack as $key => $val ) {
    if( is_array($val) && $subPath = array_searchRecursive($needle, $val, $strict, $path) ) {
      $path = array_merge($path, array($key), $subPath);
      return $path;
    } elseif( (!$strict && $val == $needle) || ($strict && $val === $needle) ) {
      $path[] = $key;
      return $path;
    }
  }
  return false;
}

// Route and title form content table

$path=array_searchRecursive($contenu, $TABRUBRIQUES);
if(!$path) {
	$contenu = DEFAULTCONTENT;
} else {
	$titre = $TABRUBRIQUES[$path[0]][2];
} 
$pageTitle = $titre." | ".LONGSITENAME."";

// Menu builder (to build nav or tab with short label $tab[1] ou long name $tab[2])

function simpleListe($paramStyles="menu-bar horizontal",$TABRUBRIQUES,$contenu) 
{
	$laListe = "<ul class=\"$paramStyles\">\n";
	$tousTabs= array_values($TABRUBRIQUES);	
	for($i=0;$i<count($tousTabs);$i++)
	{
		$tab = $tousTabs[$i];
		$laListe .= "<li";
	if ($contenu == $tab[0])
	{ 
		$laListe .= " class=\"selected\"" ;}
		$laListe .= ">";
		$laListe .= "<a href=\"".DEFAULTPAGE."?contenu=".$tab[0]."\">".$tab[1]."</a></li>\n";
	}
	$laListe .= "</ul>\n";
	return $laListe;
}


// =======================
// Markdown support
// =======================

/* Markdown support */

// require_once("helpers/bower_components/php-markdown/Michelf/Markdown.php");

/* onDemand Markdown support */

function markdown_file($filename) {
		require_once("helpers/bower_components/php-markdown/Michelf/Markdown.php");
		$filepath = "content/pages/".$filename;
		if (file_exists($filepath) && is_readable ($filepath)) {
			$theMarkdown = file_get_contents($filepath);
			$theHtml = Markdown::defaultTransform($theMarkdown);
			return $theHtml;
		}
}


// =======================
// Video player
// =======================

// videoplayer video for everybody
// params :  videoplayer(id, videoFile1, videoFile2, posterFile, size, autoplay, loop, controls)

// sample simple : echo videoplayer("video1", "http://mavideo.mp4", "http://mavideo.ogg", "http://monposter.jpg")
// sample complete : echo videoplayer("video1", "content/videos/maVideo.mp4", "content/videos/maVideo.ogg", "content/videos/monPoster.jpg", "M4", false, false, true);

function videoplayer($id, $videoFile1, $videoFile2, $posterFile, $size='M16', $autoplay=false, $loop=false, $controls=true)
{
		$video1Suffix = substr($videoFile1, -3);
		$video2Suffix = substr($videoFile2, -3);

		switch ($size)
	{
		case "S4": /* 4/3 ratio 480 x 360 */
			$width=480;
			$height=360;
			break;
		case "M4": /* 4/3 ratio 640 x 480 */
			$width=640;
			$height=480;
			break;
		case "L4":
			$width=854; /* 4/3 ratio 853 x 640 */
			$height=640;
			break;
		case "S16": /* 16/9 ratio 480 x 270 */
			$width=480; 
			$height=270;
			break;
		case "M16": /* 16/9 ratio 640 x 360 */
			$width=640;
			$height=360;
			break;
		case "L16": /* 16/9 ratio 854 x 480 */
			$width=854; 
			$height=480;
			break;
	}

	
   	$html = "";
		$html .= "<!-- \"Video For Everybody\" v0.3.2 -->\n
	<!-- first try HTML5 playback. if serving as XML, expand `controls` to `controls=\"controls\"` and autoplay likewise -->";
		$html .= "<video id=\"".$id."\" width=\"".$width."\" height=\"".$height."\"";
		if ($autoplay) {
		$html .= " autoplay=\"autoplay\"";
		}
		if ($controls) {
		$html .= " controls=\"controls\"";
		}
		if ($loop) {
		$html .= " loop=\"loop\"";
		}
		$html .= " poster=\"".$posterFile."\"";
		$html .= ">\n";
		$html .= "<!-- you must use `</source>` to avoid a closure bug in Firefox 3 / Camino 2! -->\n";
		$html .= "<source src=\"".$videoFile1."\" type=\"video/".$video1Suffix."\" />\n";
		$html .= "<source src=\"".$videoFile2."\" type=\"video/".$video2Suffix."\" />\n";
		$html .= "<!-- fallback to Flash -->\n";
		$html .= "<div id=\"preview\">The player will show in this paragraph</div>\n";
		$html .= "<script type=\"text/javascript\">\n";
		$html .= "var s1 = new SWFObject('".HELPERSFILEBASE."flash_player/player.swf','ply','".$width."','".$height."','9','#ffffff');\n
	s1.addParam('allowfullscreen','true');\n
	s1.addParam('allowscriptaccess','always');\n
	s1.addParam('wmode','opaque');\n  s1.addParam('flashvars','file=".$videoFile1."&amp;image=".$posterFile."&amp;controlbar=over&amp;stretching=fill&amp;skin=".HELPERSFILEBASE."flash_player/dangdang.swf');\n
	s1.write('preview');\n";
		$html .= "</script>\n";
		$html .= "</video>\n";
		$html .= "<!-- you *must* offer a download link as they may be able to play the file locally. customise this bit all you want -->\n";
		$html .= "<p class=\"accessibility\">Download Video: <a href=\"".$videoFile1."\">".$video1Suffix." format</a> | <a href=\"".$videoFile2."\">".$video2Suffix." format</a></p>\n";
		return $html;
}

?>