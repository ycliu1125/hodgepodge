package com.torr.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller("com.torr.web.HomeController")
@RequestMapping("/home")
public class HomeController {

    @GetMapping({"", "/index"})
    public String index() {
        return "index";
    }

    @GetMapping("/map")
    public String map() {
        return "/google/map";
    }

}
