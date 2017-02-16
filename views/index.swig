{% extends 'layout.swig' %}

{% block content %}
<h1>{{ title }}</h1>
<p>Welcome to {{ title }}</p>
<span>error : {{error}}</span>
<span>attempts: {{attempts}}</span>
<span>{{message}}</span>
<form id="numberInput">
    <input type="range" min="100" max="999" />
    <button type="button" id="guess">Send guess</button> <span id="show-guess"><b>guess</b>:<span class="number"></span></span>
</form>
{% endblock %}
