package com.ggums.ggumtle.common.response;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.util.HashMap;

public class Response extends HashMap<String, Object> {

	private static final long serialVersionUID = 1L;

	public static final String RESULT 	= "result";
	public static final String CODE 	= "code";
	public static final String MESSAGE 	= "message";
	public static final String OK 		= "ok";
	public static final String FAIL 	= "fail";

	public Response()
	{
		setData(Response.RESULT, Response.OK);
	}

	public Response(String key, Object data)
	{
		setData(Response.RESULT, Response.OK);
		setData(key, data);
	}

	public void setData(String key, Object data)
	{
		put(key, data);
	}

	public Object getData(String key)
	{
		return get(key);
	}

	@Override
	public String toString() {
		ObjectMapper mapper = new ObjectMapper();
		try {
			return mapper.writeValueAsString(this);
		} catch (JsonProcessingException e) {
			return "{}";
		}
	}
}
