package com.torr.web;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller("com.torr.web.HomeController")
@RequestMapping("/home")
public class HomeController {

    @Value("${torr.google-map-key}")
    private String mapKey;

    @GetMapping({"", "/index"})
    public String index() {
        return "index";
    }

    @GetMapping("/map")
    public String map(Model model) {
        model.addAttribute("mapKey", mapKey);
        return "/google/map";
    }

}
