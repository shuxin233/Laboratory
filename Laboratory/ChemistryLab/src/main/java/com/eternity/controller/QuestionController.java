package com.eternity.controller;

import com.alibaba.fastjson.JSONObject;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@Api(tags = "练习相关接口")
@CrossOrigin(origins = "*")
@RestController
public class QuestionController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @ApiOperation("获取所有题目分类")
    @GetMapping("/exps")
    public JSONObject exps() {
        JSONObject response = new JSONObject();
        String sql = "select distinct exp from question";
        List< Map<String, Object> > ans = jdbcTemplate.queryForList(sql);
        response.put("code", 200);
        response.put("msg", "查找成功");
        response.put("body", ans);
        return response;
    }

    @ApiOperation("获取某一分类某一类型的题目")
    @GetMapping("/pros")
    public JSONObject pros(@RequestParam() String exp, @RequestParam() String type) {
        JSONObject response = new JSONObject();
        String sql = " from question where exp = \'" + exp + "\' and type = ";
        if("filling".equals(type)) {
            sql = "select id, pro" + sql + "\'filling\'";
        }
        else if("choice".equals(type)) {
            sql = "select id, pro, a, b, c, d" + sql + "\'choice\'";
        }
        else {
            response.put("code", 404);
            response.put("msg", "题目分类不存在");
            return response;
        }
        List< Map<String, Object> > ans = jdbcTemplate.queryForList(sql);
        response.put("code", 200);
        response.put("msg", "查找成功");
        response.put("body", ans);
        return response;
    }

    @ApiOperation("判断作答正误")
    @GetMapping("/jdg")
    public JSONObject jdg(@RequestParam() String id, @RequestParam() String ans) {
        JSONObject response = new JSONObject();
        String sql = "select ans from question where id = " + id;
        String std = jdbcTemplate.queryForObject(sql, String.class);
        response.put("code", 200);
        response.put("msg", "提交成功");
        JSONObject body = new JSONObject();
        if(std.equals(ans)) {
            body.put("jdg", "答案正确");
        }
        else {
            body.put("jdg", "答案错误");
        }
        response.put("body", body);
        return response;
    }


}
