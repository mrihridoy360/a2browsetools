import React from 'react';
import './Pages.css';

const AboutUs: React.FC = () => {
  return (
    <div className="page-container">
      <h1>আমাদের সম্পর্কে</h1>
      <p>
        আমরা একটি প্রযুক্তি কোম্পানি যা বাংলাদেশের লেখকদের জন্য উন্নত লেখা টুলস প্রদান করে।
        আমাদের লক্ষ্য হল বাংলা ভাষায় উচ্চমানের কন্টেন্ট তৈরিতে সহায়তা করা।
      </p>
      <h2>আমাদের মিশন</h2>
      <p>
        আমাদের মিশন হল বাংলা ভাষাভাষী লেখকদের জন্য আধুনিক প্রযুক্তি ব্যবহার করে
        সহজ ও কার্যকরী লেখা টুলস প্রদান করা, যাতে তারা তাদের লেখার মান উন্নত করতে পারেন।
      </p>
      <h2>আমাদের দর্শন</h2>
      <p>
        আমরা বিশ্বাস করি যে প্রতিটি লেখকের মধ্যে একজন মহান লেখক লুকিয়ে আছে।
        আমাদের টুলগুলি ব্যবহার করে, আমরা আশা করি যে আমরা সেই সম্ভাবনাকে উন্মোচন করতে সাহায্য করব।
      </p>
    </div>
  );
};

export default AboutUs;
