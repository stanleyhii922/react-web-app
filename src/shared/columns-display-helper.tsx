import { Space } from "antd";

export const getStandardColumn = (title: string, dataIndex: string) => {
    return {
        title,
        dataIndex,
        render: (text: string) => {
            let data = text;
            return (
                <Space size="middle">
                    {data ?? '-'}
                </Space>
            )
        }
    }
};