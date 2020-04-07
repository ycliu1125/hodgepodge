<#ftl output_format="HTML" />

<nav class="navbar navbar-expand-md bg-dark navbar-dark">
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse flow-right" id="collapsibleNavbar">
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" href="<@spring.url "/home/index"/>">Index</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="<@spring.url "/home/introduction"/>">Introduction</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="<@spring.url "/home/map"/>">Map</a>
      </li>
    </ul>
  </div>
</nav>