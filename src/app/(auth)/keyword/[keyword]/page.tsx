import Image from 'next/image'; // Import the Image component

export default function Page({ params }: { params: { keyword: string } }) {
  const image = (
    <div className='rounded-md'>
      <Image
        src='https://picsum.photos/seed/picsum/200/300'
        alt='picsum'
        width={200}
        height={300}
        className='h-auto w-auto object-cover transition-all hover:scale-105 aspect-[2/3]'
      />
    </div>
  );
  return (
    <div>
      {image}
      {params.keyword}
    </div>
  );
}
