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

@Api(tags = "评论相关接口")
@CrossOrigin(origins = "*")
@RestController
public class CommentController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @ApiOperation("/提交评论")
    @GetMapping("comment")
    public JSONObject comment(@RequestParam() String id,
                              @RequestParam() String comment) {
        JSONObject response = new JSONObject();
        if(id.length() != 8) {
            response.put("code", 400);
            response.put("msg", "学号错误");
            return response;
        }
        if(comment.length() == 0) {
            response.put("code", 400);
            response.put("msg", "评论为空");
            return response;
        }
        if(comment.length() > 300) {
            comment = comment.substring(0, 300);
        }
        java.util.Date preDate = new java.util.Date();
        java.sql.Date date = new java.sql.Date(preDate.getTime());
        String sql = "insert into comment values (null,\'" + id + "\',\'" + comment + "\',\'" + date + "\')";
        jdbcTemplate.execute(sql);
        response.put("code", 200);
        response.put("msg", "提交成功");
        return response;
    }

    @ApiOperation("查看所有评论")
    @GetMapping("comments")
    public JSONObject comments() {
        JSONObject response = new JSONObject();
        String sql = "select * from comment";
        List< Map<String, Object> > ans = jdbcTemplate.queryForList(sql);
        response.put("code", 200);
        response.put("msg", "查找成功");
        response.put("body", ans);
        return response;
    }

}
