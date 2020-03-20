package com.eternity.controller;

import com.alibaba.fastjson.JSONObject;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Api(tags = "用户相关接口")
@CrossOrigin(origins = "*")
@RestController
public class UserController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @ApiOperation("学生登录")
    @PostMapping(value = "/login")
    public JSONObject login(@RequestBody JSONObject postBody) {
        JSONObject response = new JSONObject();
        String id = postBody.getString("id");
        String psw = postBody.getString("psw");
        String sql = "select id, name from student where id = \'" + id + "\' and psw = \'" + psw + "\'";
        List< Map<String, Object> > ans = jdbcTemplate.queryForList(sql);
        int num = ans.size();
        if(num != 1) {
            response.put("code", 400);
            response.put("msg", "登陆失败");
        }
        else {
            response.put("code", 200);
            response.put("msg", "登陆成功");
            response.put("body", ans);
        }
        return response;
    }

}
