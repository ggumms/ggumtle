package com.ggums.ggumtle.common.response;

public class ResponseFail extends Response {

	private static final long serialVersionUID = 1L;

	public ResponseFail(String code, String message) {
		setData(Response.RESULT, Response.FAIL);
		setData(Response.CODE, code);
		setData(Response.MESSAGE, message);
	}
}
