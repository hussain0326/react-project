import React from "react";
//import { shallow } from "enzyme";

// React　と Enzyme結合するために、この設定をします。
import "../enzymeConfig";
import Login1 from "./login1";
import "../setupTest";

describe("Test login form", function() {
  let wrapper;

  it("ユーザー名を正しく作成された。", function() {
    wrapper = shallow(<Login1 />);
    wrapper.find('input[type="text"]').simulate("change", {
      target: { id: "email", value: "world" }
    });
    expect(wrapper.state("email")).toEqual("world");
  });

  it("パスワードを正しく作成された。", function() {
    wrapper = shallow(<Login1 />);
    wrapper.find('input[type="text"]').simulate("change", {
      target: { id: "password", value: "123" }
    });
    expect(wrapper.state("password")).toEqual("123");
  });

  it("login check with right data", () => {
    wrapper = shallow(<Login1 />);
    wrapper
      .find('input[type="text"]')
      .simulate("change", { target: { id: "username", value: "world" } });
    wrapper
      .find('input[type="password"]')
      .simulate("change", { target: { id: "password", value: "123" } });
    wrapper.find("button").simulate("click");
    expect(wrapper.state("islogged")).toBe(true);
  });
});
