package com.eternity.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.core.env.Profiles;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.ArrayList;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Bean
    public Docket docket(Environment environment) {
        Profiles profiles = Profiles.of("dev", "test");
        boolean flag = environment.acceptsProfiles(profiles);
        return new Docket(DocumentationType.SWAGGER_2).apiInfo(apiInfo()).enable(flag)
                .select().apis(RequestHandlerSelectors.basePackage("com.eternity.controller")).build();
    }

    private ApiInfo apiInfo() {

        Contact contact = new Contact("Ethereality", "http://amiya.vip", "ethereality@vip.qq.com");

        return new ApiInfo(
                "Swagger For Ethereality",
                "@MissCold05",
                "v1.0",
                "http://amiya.vip",
                contact,
                "Apache 2.0",
                "http://www.apache.org/licenses/LICENSES-2.0",
                new ArrayList()
        );
    }

}
