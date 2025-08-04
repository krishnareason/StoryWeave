import Image from 'next/image';
import Link from 'next/link';
interface Props { authorName: string; title: string; snippet: string; imageUrl: string; date: string; readTime: string; postUrl: string; }
export default function BlogPostCard({ authorName, title, snippet, imageUrl, date, readTime, postUrl }: Props) {
  return (
    <Link href={postUrl} className="block group mb-8">
      <div className="flex items-start justify-between space-x-4">
        <div className="flex-1">
          <p className="font-medium text-sm mb-2">{authorName}</p>
          <h2 className="font-bold text-xl mb-2 group-hover:underline">{title}</h2>
          <p className="text-gray-600 text-base hidden md:block">{snippet}</p>
          <div className="text-xs text-gray-500 mt-4"><span>{date}</span> · <span>{readTime}</span></div>
        </div>
        <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 relative">
          <Image src={imageUrl} alt={title} fill sizes="128px" className="object-cover" />
        </div>
      </div>
    </Link>
  );
}