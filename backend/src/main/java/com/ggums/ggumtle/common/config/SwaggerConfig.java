package com.ggums.ggumtle.common.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Value("${springdoc.swagger-ui.info.title}")
    private String title;
    @Value("${springdoc.swagger-ui.info.description}")
    private String description;
    @Value("${springdoc.swagger-ui.info.version}")
    private String version;
    @Value("${spring.jwt.secret.develop_dummy_1}")
    private String developDummy1;
    @Value("${spring.jwt.secret.develop_dummy_2}")
    private String developDummy2;
    @Value("${spring.jwt.secret.develop_dummy_3}")
    private String developDummy3;
    @Value("${spring.jwt.secret.develop_dummy_4}")
    private String developDummy4;
    @Value("${spring.jwt.secret.develop_dummy_5}")
    private String developDummy5;
    @Value("${spring.jwt.secret.develop_dummy_6}")
    private String developDummy6;

    @Bean
    public OpenAPI openAPI() {
        final String securitySchemeName = "bearerAuth";
        return new OpenAPI()
                .addSecurityItem(new SecurityRequirement().addList(securitySchemeName))
                .components( new Components()
                        .addSecuritySchemes(securitySchemeName,
                                new SecurityScheme()
                                        .name(securitySchemeName)
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                        ))
                .info(apiInfo());
    }

    private Info apiInfo() {
        return new Info()
                .title(title)
                .description(description + "<br><br><h3>Develop Token ::</h3>" +
                        "Develop Dummy 1 : " + developDummy1 + "<br>" +
                        "Develop Dummy 2 : " + developDummy2 + "<br>" +
                        "Develop Dummy 3 : " + developDummy3 + "<br>" +
                        "Develop Dummy 4 : " + developDummy4 + "<br>" +
                        "Develop Dummy 5 : " + developDummy5 + "<br>" +
                        "Develop Dummy 6 : " + developDummy6 + "<br>" +
                        "Dummy number == userId<br>"
                )
                .version(version);
    }
}
