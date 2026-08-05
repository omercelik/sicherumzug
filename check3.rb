require 'nokogiri'

doc = Nokogiri::XML(File.read('_site/sitemap.xml'))
urls = doc.xpath('//xmlns:url', 'xmlns' => 'http://www.sitemaps.org/schemas/sitemap/0.9')

has_error = false
count = 0

urls.each do |url|
  loc = url.xpath('xmlns:loc', 'xmlns' => 'http://www.sitemaps.org/schemas/sitemap/0.9').text
  lastmod = url.xpath('xmlns:lastmod', 'xmlns' => 'http://www.sitemaps.org/schemas/sitemap/0.9').text

  if lastmod.empty?
    puts "Missing lastmod: #{loc}"
    has_error = true
  end

  if loc.match?(/phase|plan|audit|report|draft|blueprint|map|roadmap/i)
    puts "Internal file found: #{loc}"
    has_error = true
  end
  count += 1
end

puts "Total URLs: #{count}"
exit(has_error ? 1 : 0)
