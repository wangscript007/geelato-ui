<template>
  <div>
    <h4 class="ui header">
      <div class="ui circular label" :class="color">图标颜色</div>
      <a class="ui  circular label" @click="color=''" >默认</a>
      <div class="content">
        <a class="ui red empty circular label" title="red" @click="color='red'"></a>
        <a class="ui orange empty circular label" title="orange" @click="color='orange'"></a>
        <a class="ui yellow empty circular label" title="yellow" @click="color='yellow'"></a>
        <a class="ui olive empty circular label" title="olive" @click="color='olive'"></a>
        <a class="ui green empty circular label" title="green" @click="color='green'"></a>
        <a class="ui teal empty circular label" title="teal" @click="color='teal'"></a>
        <a class="ui blue empty circular label" title="blue" @click="color='blue'"></a>
        <a class="ui violet empty circular label" title="violet" @click="color='violet'"></a>
        <a class="ui purple empty circular label" title="purple" @click="color='purple'"></a>
        <a class="ui pink empty circular label" title="pink" @click="color='pink'"></a>
        <a class="ui brown empty circular label" title="brown" @click="color='brown'"></a>
        <a class="ui grey empty circular label" title="grey" @click="color='grey'"></a>
        <a class="ui black empty circular label" title="black" @click="color='black'"></a>
      </div>
    </h4>
    <h4 class="ui header">
      Web Content
    </h4>
    <p>
      Icons can represent types of content found on websites
    </p>
    <div>
      <i class="add to calendar icon"></i> <i class="address book icon"></i> <i class="address book outline icon"></i>
      <i class="address card icon"></i> <i class="address card outline icon"></i> <i class="alarm icon"></i> <i
      class="alarm mute icon"></i> <i class="alarm mute outline icon"></i> <i class="alarm outline icon"></i> <i
      class="at icon"></i> <i class="browser icon"></i> <i class="bug icon"></i> <i class="calendar icon"></i> <i
      class="calendar outline icon"></i> <i class="checked calendar icon"></i> <i class="cloud icon"></i> <i
      class="code icon"></i> <i class="comment icon"></i> <i class="comment outline icon"></i> <i
      class="comments icon"></i> <i class="comments icon"></i> <i class="comments outline icon"></i> <i
      class="copyright icon"></i> <i class="creative commons icon"></i> <i class="dashboard icon"></i> <i
      class="delete calendar icon"></i> <i class="external icon"></i> <i class="external icon"></i> <i
      class="external square icon"></i> <i class="eyedropper icon"></i> <i class="feed icon"></i> <i
      class="find icon"></i> <i class="hand pointer icon"></i> <i class="handshake icon"></i> <i
      class="hashtag icon"></i> <i class="heartbeat icon"></i> <i class="history icon"></i> <i class="home icon"></i>
      <i
        class="hourglass empty icon"></i> <i class="hourglass end icon"></i> <i class="hourglass full icon"></i> <i
      class="hourglass half icon"></i> <i class="hourglass start icon"></i> <i class="id badge icon"></i> <i
      class="id card icon"></i> <i class="id card outline icon"></i> <i class="idea icon"></i> <i
      class="image icon"></i> <i class="inbox icon"></i> <i class="industry icon"></i> <i class="lab icon"></i> <i
      class="mail icon"></i> <i class="mail outline icon"></i> <i class="mail square icon"></i> <i
      class="mouse pointer icon"></i> <i class="open envelope icon"></i> <i class="open envelope outline icon"></i> <i
      class="options icon"></i> <i class="paint brush icon"></i> <i class="payment icon"></i> <i
      class="percent icon"></i> <i class="podcast icon"></i> <i class="privacy icon"></i> <i class="protect icon"></i>
      <i class="registered icon"></i> <i class="remove from calendar icon"></i> <i class="search icon"></i> <i
      class="setting icon"></i> <i class="settings icon"></i> <i class="shop icon"></i> <i
      class="shopping bag icon"></i> <i class="shopping basket icon"></i> <i class="sidebar icon"></i> <i
      class="signal icon"></i> <i class="sitemap icon"></i> <i class="tag icon"></i> <i class="tags icon"></i> <i
      class="tasks icon"></i> <i class="terminal icon"></i> <i class="text telephone icon"></i> <i
      class="ticket icon"></i> <i class="trademark icon"></i> <i class="trophy icon"></i> <i
      class="window close icon"></i> <i class="window close outline icon"></i> <i class="window maximize icon"></i> <i
      class="window minimize icon"></i> <i class="window restore icon"></i>
    </div>
    <h4 class="ui header">
      User Actions
    </h4>
    <p>
      Icons can represent common actions a user can take
    </p>
    <div>
      <i class="add to cart icon"></i>
      <i class="add user icon"></i>
      <i class="adjust icon"></i>
      <i class="archive icon"></i>
      <i class="ban icon"></i>
      <i class="bookmark icon"></i>
      <i class="call icon"></i>
      <i class="call square icon"></i>
      <i class="clone icon"></i>
      <i class="cloud download icon"></i>
      <i class="cloud upload icon"></i>
      <i class="talk icon"></i>
      <i class="talk outline icon"></i>
      <i class="compress icon"></i>
      <i class="configure icon"></i>
      <i class="download icon"></i>
      <i class="edit icon"></i>
      <i class="erase icon"></i>
      <i class="exchange icon"></i>
      <i class="expand icon"></i>
      <i class="external share icon"></i>
      <i class="filter icon"></i>
      <i class="hide icon"></i>
      <i class="in cart icon"></i>
      <i class="lock icon"></i>
      <i class="mail forward icon"></i>
      <i class="object group icon"></i>
      <i class="object ungroup icon"></i>
      <i class="pin icon"></i>
      <i class="print icon"></i>
      <i class="random icon"></i>
      <i class="recycle icon"></i>
      <i class="refresh icon"></i>
      <i class="remove bookmark icon"></i>
      <i class="remove user icon"></i>
      <i class="repeat icon"></i>
      <i class="reply all icon"></i>
      <i class="reply icon"></i>
      <i class="retweet icon"></i>
      <i class="send icon"></i>
      <i class="send outline icon"></i>
      <i class="share alternate icon"></i>
      <i class="share alternate square icon"></i>
      <i class="share icon"></i>
      <i class="share square icon"></i>
      <i class="sign in icon"></i>
      <i class="sign out icon"></i>
      <i class="theme icon"></i>
      <i class="translate icon"></i>
      <i class="undo icon"></i>
      <i class="unhide icon"></i>
      <i class="unlock alternate icon"></i>
      <i class="unlock icon"></i>
      <i class="upload icon"></i>
      <i class="wait icon"></i>
      <i class="wizard icon"></i>
      <i class="write icon"></i>
      <i class="write square icon"></i>
    </div>
    <h4 class="ui header">
      Message
    </h4>
    <p>
      Icons can alert users to the type of message being displayed
    </p>
    <div>
      <i class="announcement icon"></i>
      <i class="birthday icon"></i>
      <i class="help circle icon"></i>
      <i class="help icon"></i>
      <i class="info circle icon"></i>
      <i class="info icon"></i>
      <i class="warning circle icon"></i>
      <i class="warning icon"></i>
      <i class="warning sign icon"></i>
    </div>
    <h4 class="ui header">
      User Types
    </h4>
    <p>
      Icons can represent types of people
    </p>
    <div>
      <i class="child icon"></i>
      <i class="doctor icon"></i>
      <i class="handicap icon"></i>
      <i class="spy icon"></i>
      <i class="student icon"></i>
      <i class="user icon"></i>
      <i class="user circle"></i>
      <i class="user circle outline"></i>
      <i class="user outline"></i>
      <i class="users icon"></i>
    </div>

    <h4 class="ui header">
      Gender & Sexuality
    </h4>
    <p>
      Icons can represent genders or types of sexuality
    </p>
    <div>
      <i class="female icon"></i>
      <i class="gay icon"></i>
      <i class="genderless icon"></i>
      <i class="heterosexual icon"></i>
      <i class="intergender icon"></i>
      <i class="lesbian icon"></i>
      <i class="male icon"></i>
      <i class="man icon"></i>
      <i class="neuter icon"></i>
      <i class="non binary transgender icon"></i>
      <i class="other gender horizontal icon"></i>
      <i class="other gender icon"></i>
      <i class="other gender vertical icon"></i>
      <i class="transgender icon"></i>
      <i class="woman icon"></i>
    </div>

    <h4 class="ui header">
      Layout Adjustment
    </h4>
    <p>
      Icons can alert users to common ways to adjust page layouts
    </p>
    <div>
      <i class="block layout icon"></i>
      <i class="crop icon"></i>
      <i class="grid layout icon"></i>
      <i class="list layout icon"></i>
      <i class="maximize icon"></i>
      <i class="resize horizontal icon"></i>
      <i class="resize vertical icon"></i>
      <i class="zoom icon"></i>
      <i class="zoom out icon"></i>
    </div>


    <h4 class="ui header">
      Objects
    </h4>
    <p>
      Icons can be used to represent common objects
    </p>
    <div>
      <i class="anchor icon"></i>
      <i class="bar icon"></i>
      <i class="bathtub icon"></i>
      <i class="bomb icon"></i>
      <i class="book icon"></i>
      <i class="bullseye icon"></i>
      <i class="calculator icon"></i>
      <i class="cocktail icon"></i>
      <i class="diamond icon"></i>
      <i class="fax icon"></i>
      <i class="fire extinguisher icon"></i>
      <i class="fire icon"></i>
      <i class="flag checkered icon"></i>
      <i class="flag icon"></i>
      <i class="flag outline icon"></i>
      <i class="gift icon"></i>
      <i class="hand lizard icon"></i>
      <i class="hand peace icon"></i>
      <i class="hand paper icon"></i>
      <i class="hand rock icon"></i>
      <i class="hand scissors icon"></i>
      <i class="hand spock icon"></i>
      <i class="law icon"></i>
      <i class="leaf icon"></i>
      <i class="legal icon"></i>
      <i class="lemon icon"></i>
      <i class="life ring icon"></i>
      <i class="lightning icon"></i>
      <i class="magnet icon"></i>
      <i class="money icon"></i>
      <i class="moon icon"></i>
      <i class="plane icon"></i>
      <i class="puzzle icon"></i>
      <i class="road icon"></i>
      <i class="rocket icon"></i>
      <i class="shipping icon"></i>
      <i class="shower icon"></i>
      <i class="snowflake icon"></i>
      <i class="soccer icon"></i>
      <i class="sticky note icon"></i>
      <i class="sticky note outline icon"></i>
      <i class="suitcase icon"></i>
      <i class="sun icon"></i>
      <i class="thermometer empty icon"></i>
      <i class="thermometer quarter icon"></i>
      <i class="thermometer half icon"></i>
      <i class="thermometer three quarters icon"></i>
      <i class="thermometer full icon"></i>
      <i class="travel icon"></i>
      <i class="treatment icon"></i>
      <i class="tv icon"></i>
      <i class="umbrella icon"></i>
      <i class="world icon"></i>
    </div>


    <h4 class="ui header">
      Shapes
    </h4>
    <p>
      Icons can be used to create shapes
    </p>
    <div>
      <i class="asterisk icon"></i>
      <i class="certificate icon"></i>
      <i class="circle icon"></i>
      <i class="circle notched icon"></i>
      <i class="circle thin icon"></i>
      <i class="crosshairs icon"></i>
      <i class="cube icon"></i>
      <i class="cubes icon"></i>
      <i class="ellipsis horizontal icon"></i>
      <i class="ellipsis vertical icon"></i>
      <i class="quote left icon"></i>
      <i class="quote right icon"></i>
      <i class="spinner icon"></i>
      <i class="square icon"></i>
      <i class="square outline icon"></i>
    </div>

    <h4 class="ui header">
      Item Selection
    </h4>
    <p>
      Icons can show whether an item is included in a set
    </p>
    <div>
      <i class="add circle icon"></i>
      <i class="add square icon"></i>
      <i class="check circle icon"></i>
      <i class="check circle outline icon"></i>
      <i class="check square icon"></i>
      <i class="checkmark box icon"></i>
      <i class="checkmark icon"></i>
      <i class="minus circle icon"></i>
      <i class="minus icon"></i>
      <i class="minus square icon"></i>
      <i class="minus square outline icon"></i>
      <i class="move icon"></i>
      <i class="plus icon"></i>
      <i class="plus square outline icon"></i>
      <i class="radio icon"></i>
      <i class="remove circle icon"></i>
      <i class="remove circle outline icon"></i>
      <i class="remove icon"></i>
      <i class="selected radio icon"></i>
      <i class="toggle off icon"></i>
      <i class="toggle on icon"></i>
    </div>

    <h4 class="ui header">
      Media
    </h4>
    <p>
      Icons can represent common media types
    </p>
    <div>
      <i class="area chart icon"></i>
      <i class="bar chart icon"></i>
      <i class="camera retro icon"></i>
      <i class="film icon"></i>
      <i class="line chart icon"></i>
      <i class="newspaper icon"></i>
      <i class="photo icon"></i>
      <i class="pie chart icon"></i>
      <i class="sound icon"></i>
    </div>

    <h4 class="ui header">
      Pointers
    </h4>
    <p>
      Icons can be used to indicate a direction
    </p>
    <div>

    </div>


    <h4 class="ui header">
      Pointers
    </h4>
    <p>
      Icons can be used to indicate a direction
    </p>
    <div>
      <i class="angle double down icon"></i>
      <i class="angle double left icon"></i>
      <i class="angle double right icon"></i>
      <i class="angle double up icon"></i>
      <i class="angle down icon"></i>
      <i class="angle left icon"></i>
      <i class="angle right icon"></i>
      <i class="angle up icon"></i>
      <i class="arrow circle down icon"></i>
      <i class="arrow circle left icon"></i>
      <i class="arrow circle outline down icon"></i>
      <i class="arrow circle outline left icon"></i>
      <i class="arrow circle outline right icon"></i>
      <i class="arrow circle outline up icon"></i>
      <i class="arrow circle right icon"></i>
      <i class="arrow circle up icon"></i>
      <i class="arrow down icon"></i>
      <i class="arrow left icon"></i>
      <i class="arrow right icon"></i>
      <i class="arrow up icon"></i>
      <i class="caret down icon"></i>
      <i class="caret left icon"></i>
      <i class="caret right icon"></i>
      <i class="caret up icon"></i>
      <i class="chevron circle down icon"></i>
      <i class="chevron circle left icon"></i>
      <i class="chevron circle right icon"></i>
      <i class="chevron circle up icon"></i>
      <i class="chevron down icon"></i>
      <i class="chevron left icon"></i>
      <i class="chevron right icon"></i>
      <i class="chevron up icon"></i>
      <i class="long arrow down icon"></i>
      <i class="long arrow left icon"></i>
      <i class="long arrow right icon"></i>
      <i class="long arrow up icon"></i>
      <i class="pointing down icon"></i>
      <i class="pointing left icon"></i>
      <i class="pointing right icon"></i>
      <i class="pointing up icon"></i>
      <i class="toggle down icon"></i>
      <i class="toggle left icon"></i>
      <i class="toggle right icon"></i>
      <i class="toggle up icon"></i>
    </div>

    <h4 class="ui header">
      Mobile
    </h4>
    <p>
      Icons can represent mobile devices, types of content found on mobile devices.
    </p>
    <div>
      <i class="mobile icon"></i>
      <i class="tablet icon"></i>
      <i class="battery empty icon"></i>
      <i class="battery low icon"></i>
      <i class="battery medium icon"></i>
      <i class="battery high icon"></i>
      <i class="battery full icon"></i>
    </div>

    <h4 class="ui header">
      Computer
    </h4>
    <p>
      Icons can represent computing devices, or types of content found on a computer.
    </p>
    <div>
      <i class="desktop icon"></i>
      <i class="disk outline icon"></i>
      <i class="game icon"></i>
      <i class="keyboard icon"></i>
      <i class="laptop icon"></i>
      <i class="plug icon"></i>
      <i class="power icon"></i>
    </div>

    <h4 class="ui header">
      Computer and File System
    </h4>
    <p>
      Icons can represent elements of a computer and its file system
    </p>
    <div>
      <i class="file archive outline icon"></i> <i class="file audio outline icon"></i> <i
      class="file code outline icon"></i> <i class="file excel outline icon"></i> <i class="file icon"></i> <i
      class="file image outline icon"></i> <i class="file outline icon"></i> <i class="file pdf outline icon"></i> <i
      class="file powerpoint outline icon"></i> <i class="file text icon"></i> <i class="file text outline icon"></i> <i
      class="file video outline icon"></i> <i class="file word outline icon"></i> <i class="folder icon"></i> <i
      class="folder open icon"></i> <i class="folder open outline icon"></i> <i class="folder outline icon"></i> <i
      class="level down icon"></i> <i class="level up icon"></i> <i class="trash icon"></i> <i
      class="trash outline icon"></i>
    </div>

    <h4 class="ui header">
      Technologies
    </h4>
    <p>
      Icons can represent common technologies
    </p>
    <div>
      <i class="barcode icon"></i>
      <i class="bluetooth alternative icon"></i>
      <i class="bluetooth icon"></i>
      <i class="css3 icon"></i>
      <i class="database icon"></i>
      <i class="fork icon"></i>
      <i class="html5 icon"></i>
      <i class="microchip icon"></i>
      <i class="openid icon"></i>
      <i class="qrcode icon"></i>
      <i class="rss icon"></i>
      <i class="rss square icon"></i>
      <i class="server icon"></i>
      <i class="usb icon"></i>
    </div>

    <h4 class="ui header">
      Rating
    </h4>
    <p>
      Icons can be used to represent users attitude towards content
    </p>
    <div>
      <i class="empty heart icon"></i>
      <i class="empty star icon"></i>
      <i class="frown icon"></i>
      <i class="heart icon"></i>
      <i class="meh icon"></i>
      <i class="smile icon"></i>
      <i class="star half empty icon"></i>
      <i class="star half icon"></i>
      <i class="star icon"></i>
      <i class="thumbs down icon"></i>
      <i class="thumbs outline down icon"></i>
      <i class="thumbs outline up icon"></i>
      <i class="thumbs up icon"></i>
    </div>

    <h4 class="ui header">
      Audio
    </h4>
    <p>
      Icons can be used to represent common ways to interact with audio
    </p>
    <div>
      <i class="backward icon"></i>
      <i class="closed captioning icon"></i>
      <i class="eject icon"></i>
      <i class="fast backward icon"></i>
      <i class="fast forward icon"></i>
      <i class="forward icon"></i>
      <i class="music icon"></i>
      <i class="mute icon"></i>
      <i class="pause circle icon"></i>
      <i class="pause circle outline icon"></i>
      <i class="pause icon"></i>
      <i class="play icon"></i>
      <i class="record icon"></i>
      <i class="step backward icon"></i>
      <i class="step forward icon"></i>
      <i class="stop circle icon"></i>
      <i class="stop circle outline icon"></i>
      <i class="stop icon"></i>
      <i class="unmute icon"></i>
      <i class="video play icon"></i>
      <i class="video play outline icon"></i>
      <i class="volume down icon"></i>
      <i class="volume off icon"></i>
      <i class="volume up icon"></i>
    </div>

    <h4 class="ui header">
      Map
    </h4>
    <p>
      Icons can be used to represent elements on a map
    </p>
    <div>
      <i class="bicycle icon"></i>
      <i class="building icon"></i>
      <i class="building outline icon"></i>
      <i class="bus icon"></i>
      <i class="car icon"></i>
      <i class="coffee icon"></i>
      <i class="compass icon"></i>
      <i class="emergency icon"></i>
      <i class="first aid icon"></i>
      <i class="food icon"></i>
      <i class="h icon"></i>
      <i class="hospital icon"></i>
      <i class="hotel icon"></i>
      <i class="location arrow icon"></i>
      <i class="map icon"></i>
      <i class="map outline icon"></i>
      <i class="map pin icon"></i>
      <i class="map signs icon"></i>
      <i class="marker icon"></i>
      <i class="military icon"></i>
      <i class="motorcycle icon"></i>
      <i class="paw icon"></i>
      <i class="ship icon"></i>
      <i class="space shuttle icon"></i>
      <i class="spoon icon"></i>
      <i class="street view icon"></i>
      <i class="subway icon"></i>
      <i class="taxi icon"></i>
      <i class="train icon"></i>
      <i class="television icon"></i>
      <i class="tree icon"></i>
      <i class="university icon"></i>
    </div>

    <h4 class="ui header">
      Tables
    </h4>
    <p>
      Icons can be used to represent common actions inside a table
    </p>
    <div>
      <i class="columns icon"></i>
      <i class="sort alphabet ascending icon"></i>
      <i class="sort alphabet descending icon"></i>
      <i class="sort ascending icon"></i>
      <i class="sort content ascending icon"></i>
      <i class="sort content descending icon"></i>
      <i class="sort descending icon"></i>
      <i class="sort icon"></i>
      <i class="sort numeric ascending icon"></i>
      <i class="sort numeric descending icon"></i>
      <i class="table icon"></i>
    </div>

    <h4 class="ui header">
      Text Editor
    </h4>
    <p>
      Icons can represent common actions when editing text
    </p>
    <div>
      <i class="align center icon"></i>
      <i class="align justify icon"></i>
      <i class="align left icon"></i>
      <i class="align right icon"></i>
      <i class="attach icon"></i>
      <i class="bold icon"></i>
      <i class="copy icon"></i>
      <i class="cut icon"></i>
      <i class="font icon"></i>
      <i class="header icon"></i>
      <i class="indent icon"></i>
      <i class="italic icon"></i>
      <i class="linkify icon"></i>
      <i class="list icon"></i>
      <i class="ordered list icon"></i>
      <i class="outdent icon"></i>
      <i class="paragraph icon"></i>
      <i class="paste icon"></i>
      <i class="save icon"></i>
      <i class="strikethrough icon"></i>
      <i class="subscript icon"></i>
      <i class="superscript icon"></i>
      <i class="text cursor icon"></i>
      <i class="text height icon"></i>
      <i class="text width icon"></i>
      <i class="underline icon"></i>
      <i class="unlinkify icon"></i>
      <i class="unordered list icon"></i>
    </div>


    <h4 class="ui header">
      Currency
    </h4>
    <p>
      Icons can represent units of currency
    </p>
    <div>
      <i class="bitcoin icon"></i>
      <i class="dollar icon"></i>
      <i class="euro icon"></i>
      <i class="lira icon"></i>
      <i class="pound icon"></i>
      <i class="ruble icon"></i>
      <i class="rupee icon"></i>
      <i class="shekel icon"></i>
      <i class="won icon"></i>
      <i class="yen icon"></i>
    </div>

    <h4 class="ui header">
      Payment Options
    </h4>
    <p>
      Icons can represent common forms of payment
    </p>
    <div>
      <i class="american express icon"></i>
      <i class="credit card alternative icon"></i>
      <i class="diners club icon"></i>
      <i class="discover icon"></i>
      <i class="google wallet icon"></i>
      <i class="japan credit bureau icon"></i>
      <i class="mastercard icon"></i>
      <i class="paypal card icon"></i>
      <i class="paypal icon"></i>
      <i class="stripe icon"></i>
      <i class="visa icon"></i>
    </div>

    <h4 class="ui header">
      Accessibility
    </h4>
    <p>
      Icons can represent accessibility standards
    </p>
    <div>
      <i class="wheelchair icon"></i>
      <i class="asl interpreting icon"></i>
      <i class="assistive listening systems icon"></i>
      <i class="audio description icon"></i>
      <i class="blind icon"></i>
      <i class="braille icon"></i>
      <i class="deafness icon"></i>
      <i class="low vision icon"></i>
      <i class="sign language icon"></i>
      <i class="universal access icon"></i>
      <i class="volume control phone icon"></i>
    </div>

    <h4 class="ui header">
      Brands
    </h4>
    <p>
      Icons can represent logos to common brands
    </p>
    <div>
      <i class="500px icon"></i>
      <i class="adn icon"></i>
      <i class="amazon icon"></i>
      <i class="android icon"></i>
      <i class="angellist icon"></i>
      <i class="apple icon"></i>
      <i class="bandcamp icon"></i>
      <i class="behance icon"></i>
      <i class="behance square icon"></i>
      <i class="bitbucket icon"></i>
      <i class="bitbucket square icon"></i>
      <i class="black tie icon"></i>
      <i class="buysellads icon"></i>
      <i class="chrome icon"></i>
      <i class="codepen icon"></i>
      <i class="codiepie icon"></i>
      <i class="connectdevelop icon"></i>
      <i class="contao icon"></i>
      <i class="dashcube icon"></i>
      <i class="delicious icon"></i>
      <i class="deviantart icon"></i>
      <i class="digg icon"></i>
      <i class="dribbble icon"></i>
      <i class="dropbox icon"></i>
      <i class="drupal icon"></i>
      <i class="eercast icon"></i>
      <i class="empire icon"></i>
      <i class="envira gallery icon"></i>
      <i class="etsy icon"></i>
      <i class="expeditedssl icon"></i>
      <i class="facebook f icon"></i>
      <i class="facebook icon"></i>
      <i class="facebook square icon"></i>
      <i class="firefox icon"></i>
      <i class="first order icon"></i>
      <i class="flickr icon"></i>
      <i class="font awesome icon"></i>
      <i class="fonticons icon"></i>
      <i class="fort awesome icon"></i>
      <i class="forumbee icon"></i>
      <i class="foursquare icon"></i>
      <i class="free.code.camp icon"></i>
      <i class="gg circle icon"></i>
      <i class="gg icon"></i>
      <i class="git icon"></i>
      <i class="git square icon"></i>
      <i class="github alternate icon"></i>
      <i class="github icon"></i>
      <i class="github square icon"></i>
      <i class="gitlab icon"></i>
      <i class="gittip icon"></i>
      <i class="glide g icon"></i>
      <i class="glide icon"></i>
      <i class="google icon"></i>
      <i class="google plus circle icon"></i>
      <i class="google plus icon"></i>
      <i class="google plus square icon"></i>
      <i class="grav icon"></i>
      <i class="hacker news icon"></i>
      <i class="houzz icon"></i>
      <i class="imdb icon"></i>
      <i class="instagram icon"></i>
      <i class="internet explorer icon"></i>
      <i class="ioxhost icon"></i>
      <i class="joomla icon"></i>
      <i class="jsfiddle icon"></i>
      <i class="lastfm icon"></i>
      <i class="lastfm square icon"></i>
      <i class="leanpub icon"></i>
      <i class="linkedin icon"></i>
      <i class="linkedin square icon"></i>
      <i class="linode icon"></i>
      <i class="linux icon"></i>
      <i class="maxcdn icon"></i>
      <i class="meanpath icon"></i>
      <i class="medium icon"></i>
      <i class="meetup icon"></i>
      <i class="microsoft edge icon"></i>
      <i class="mixcloud icon"></i>
      <i class="modx icon"></i>
      <i class="odnoklassniki icon"></i>
      <i class="odnoklassniki square icon"></i>
      <i class="opencart icon"></i>
      <i class="opera icon"></i>
      <i class="optinmonster icon"></i>
      <i class="pagelines icon"></i>
      <i class="pied piper alternate icon"></i>
      <i class="pied piper hat icon"></i>
      <i class="pied piper icon"></i>
      <i class="pinterest icon"></i>
      <i class="pinterest icon"></i>
      <i class="pinterest square icon"></i>
      <i class="pocket icon"></i>
      <i class="product hunt icon"></i>
      <i class="qq icon"></i>
      <i class="quora icon"></i>
      <i class="ravelry icon"></i>
      <i class="rebel icon"></i>
      <i class="reddit alien icon"></i>
      <i class="reddit icon"></i>
      <i class="reddit square icon"></i>
      <i class="renren icon"></i>
      <i class="safari icon"></i>
      <i class="scribd icon"></i>
      <i class="sellsy icon"></i>
      <i class="shirtsinbulk icon"></i>
      <i class="simplybuilt icon"></i>
      <i class="skyatlas icon"></i>
      <i class="skype icon"></i>
      <i class="slack icon"></i>
      <i class="slideshare icon"></i>
      <i class="snapchat ghost icon"></i>
      <i class="snapchat icon"></i>
      <i class="snapchat square icon"></i>
      <i class="soundcloud icon"></i>
      <i class="spotify icon"></i>
      <i class="stack exchange icon"></i>
      <i class="stack overflow icon"></i>
      <i class="steam icon"></i>
      <i class="steam square icon"></i>
      <i class="stumbleupon circle icon"></i>
      <i class="stumbleupon icon"></i>
      <i class="superpowers icon"></i>
      <i class="telegram icon"></i>
      <i class="tencent weibo icon"></i>
      <i class="themeisle icon"></i>
      <i class="trello icon"></i>
      <i class="tripadvisor icon"></i>
      <i class="tumblr icon"></i>
      <i class="tumblr square icon"></i>
      <i class="twitch icon"></i>
      <i class="twitter icon"></i>
      <i class="twitter square icon"></i>
      <i class="viacoin icon"></i>
      <i class="viadeo icon"></i>
      <i class="viadeo square icon"></i>
      <i class="vimeo icon"></i>
      <i class="vimeo square icon"></i>
      <i class="vine icon"></i>
      <i class="vk icon"></i>
      <i class="wechat icon"></i>
      <i class="weibo icon"></i>
      <i class="whatsapp icon"></i>
      <i class="wikipedia icon"></i>
      <i class="windows icon"></i>
      <i class="wordpress icon"></i>
      <i class="wpbeginner icon"></i>
      <i class="wpexplorer icon"></i>
      <i class="wpforms icon"></i>
      <i class="xing icon"></i>
      <i class="xing square icon"></i>
      <i class="y combinator icon"></i>
      <i class="yahoo icon"></i>
      <i class="yelp icon"></i>
      <i class="yoast icon"></i>
      <i class="youtube icon"></i>
      <i class="youtube play icon"></i>
      <i class="youtube square icon"></i>
    </div>

  </div>
</template>
<script>
  export default {
    props: {},
    data () {
      return {
        color: ''
      }
    },
    mounted: function () {
      let thisVue = this
      $(this.$el).find('i').click(function (e) {
        thisVue.$emit('callModal', {selected: {className: thisVue.color + ' ' + e.target.className}})
      })
//      $(this.$el).parent().sticky({
//        context: '#selected-icon-area'
//      })
    },
    methods: {},
    components: {}
  }
</script>
<style scoped>
  div > p {
    display: none;
  }

  div > i {
    cursor: pointer;
  }
</style>
