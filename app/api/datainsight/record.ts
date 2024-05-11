import request from "../../utils/request";

const updateLastUserInput = async (content: string) => {
  try {
    const response = await request.post("/gpt_bridge/lastUserInput", {
      content: content,
    });
    return response.data; // 返回响应数据
  } catch (error) {
    // 处理或抛出错误
    throw error;
  }
};

const getLastUserInput = async () => {
  try {
    const response = await request.get(`/gpt_bridge/lastUserInput`);
    return response.data; // 直接返回数据部分
  } catch (error) {
    // 处理错误或抛出
    throw error;
  }
};

export { getLastUserInput, updateLastUserInput };
