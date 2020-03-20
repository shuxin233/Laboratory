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

@Api(tags = "建议相关接口")
@CrossOrigin(origins = "*")
@RestController
public class AdviceController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @ApiOperation("提交建议")
    @GetMapping("/advise")
    public JSONObject advise(@RequestParam() String id,
                             @RequestParam() String name,
                             @RequestParam() String tel,
                             @RequestParam() String mail,
                             @RequestParam() String advice){
        JSONObject response = new JSONObject();
        if(id.length() != 8) {
            response.put("code", 400);
            response.put("msg", "学号错误");
            return response;
        }
        if(name.length() > 8) {
            response.put("code", 400);
            response.put("msg", "姓名错误");
            return response;
        }
        if(tel.length() > 14) {
            response.put("code", 400);
            response.put("msg", "电话错误");
            return response;
        }
        if(mail.length() > 30) {
            response.put("code", 400);
            response.put("msg", "邮箱错误");
            return response;
        }
        if(advice.length() == 0) {
            response.put("code", 400);
            response.put("msg", "建议为空");
            return response;
        }
        if(advice.length() > 300) {
            advice = advice.substring(0, 300);
        }
        java.util.Date preDate = new java.util.Date();
        java.sql.Date date = new java.sql.Date(preDate.getTime());
        String sql = "insert into advice values (null,\'" + id + "\',\'" + name + "\',\'" + tel + "\',\'" + mail + "\',\'" + advice + "\',\'" + date + "\')";
        jdbcTemplate.execute(sql);
        response.put("code", 200);
        response.put("msg", "提交成功");
        return response;
    }

}
