import useSWR from "swr";
import { getBlogs } from "../library/microcms";

const BlogSearch = () => {
	const params = new URLSearchParams(window.location.search);
	const q = params.get("q");

	const { data, error, isLoading } = useSWR(
		q === null ? null : ["/search", q],
		([, q]) =>
			getBlogs({
				fields: ["id", "title"],
				q,
			})
	);

	if (error) return <div>エラーが発生しました</div>;

	if (isLoading) return <div>読み込み中...</div>;

	return (
		<div>
			{data?.contents.length !== 0 ? (
				<ul>
					{data?.contents.map(({ id, title }) => (
						<li key={id}>
							<a href={id}>{title}</a>
						</li>
					))}
				</ul>
			) : (
				<div>検索結果はありません</div>
			)}
		</div>
	);
};

export default BlogSearch;
