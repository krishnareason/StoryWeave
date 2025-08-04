const topics = ['Programming', 'Data Science', 'Technology', 'AI', 'Writing'];
export default function SidebarTopics() {
  return (
    <div>
      <h3 className="font-bold mb-4">Recommended topics</h3>
      <div className="flex flex-wrap gap-2">
        {topics.map((topic) => <a key={topic} href="#" className="bg-gray-200 text-sm px-3 py-1 rounded-full hover:bg-gray-300">{topic}</a>)}
      </div>
    </div>
  );
}